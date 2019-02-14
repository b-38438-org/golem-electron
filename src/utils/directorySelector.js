const { remote } = window.electron;
const { BrowserWindow, dialog } = remote;
const mainProcess = remote.require("./index");

const checkDominantType = function(files) {
    const isBiggerThanOther = function(element, index, array) {
        return element[1] !== array[0][1];
    };
    const tempFiles = [
        ...files.reduce(
            (acc, s) => acc.set(s, (acc.get(s) || 0) + 1),
            new Map()
        )
    ];
    const anyDominant = tempFiles.some(isBiggerThanOther);

    if (!anyDominant && tempFiles.length > 1) {
        return false;
    } else {
        return tempFiles.sort((a, b) => b[1] - a[1]).map(a => a[0])[0];
    }
};

function directorySelector(data) {
    mainProcess.dirToJson(data, "blend").then(item => {
        if (item) this.props.actions.setDirectoryTree(item);
    });
    //React Context, header and dropzone
    mainProcess.selectDirectory(data, this.props.isMainNet).then(item => {
        let mergedList = [].concat.apply([], item);
        let unknownFiles = mergedList.filter(({ malicious }) => malicious);
        let masterFiles = mergedList.filter(({ master }) => master);
        let dominantFileType = checkDominantType(
            masterFiles.map(file => file.extension)
        );

        if (unknownFiles.length > 0) {
            navigate();
            this.props.actions.setFileCheck({
                status: true,
                files: unknownFiles
            });
        } else if (masterFiles.length > 0) {
            navigate();
            this.props.actions.createTask({
                resources: mergedList.map(item => item.path),
                taskName: masterFiles[0].name,
                relativePath: data[0]
            });
        } else {
            alert(
                "There's no main file!" +
                    " There should be at least one blender file."
            );
        }

        function navigate() {
            if (masterFiles.length > 1) {
                window.routerHistory.push("/add-task/master-file");
            } else if (masterFiles.length == 1) {
                window.routerHistory.push(
                    `/add-task/type${
                        !!dominantFileType
                            ? `/${dominantFileType.substring(1)}`
                            : ""
                    }`
                );
            }
        }
    });
}

export default directorySelector;
