import React from "react";
import Lottie from "react-lottie";

import animData from "./../../../assets/anims/Concent01";
import { floatToHR } from "./../../../utils/time";

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default class TaskSummaryModal extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * [_handleCancel funcs. closes modal]
     */
    _handleCancel = () => this.props.closeModal("taskSummaryModal");

    _handleApply = () => this.props._handleStartTaskButton();

    render() {
        const {
            bid,
            compute_on,
            estimated_cost,
            format,
            frames,
            resolution,
            sample_per_pixel,
            status,
            subtasks_count,
            subtask_timeout,
            timeout
        } = this.props;
        return (
            <div className="container__modal task-summary-modal__container">
                <div className="content__modal task-summary-modal__content">
                    <div className="task-summary-modal__section-image">
                        <Lottie options={defaultOptions} />
                    </div>
                    <div className="summary__title">
                        Confirm your task settings
                    </div>
                    <div className="summary__list">
                        <div className="summary__item">
                            <span className="title">Resolution:</span>
                            <span className="value">{`${resolution[0]}x${
                                resolution[1]
                            }`}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Frames:</span>
                            <span className="value">{frames}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Samples:</span>
                            <span className="value">{sample_per_pixel}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Format:</span>
                            <span className="value">{format}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Task Timeout:</span>
                            <span className="value">{floatToHR(timeout)}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Subtask Amount:</span>
                            <span className="value">{subtasks_count}</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Subtask Timeout:</span>
                            <span className="value">
                                {floatToHR(subtask_timeout)}
                            </span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Render on:</span>
                            <span className="value">
                                {compute_on.toUpperCase()}
                            </span>
                        </div>
                        <div className="summary__item">
                            <span className="title">
                                Minimum provider score:
                            </span>
                            <span className="value">231</span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Total:</span>
                            <span className="value">
                                {estimated_cost.GNT.toFixed(3)} GNT
                            </span>
                        </div>
                        <div className="summary__item">
                            <span className="title">Tx fee lock:</span>
                            <span className="value">
                                {estimated_cost.ETH.toFixed(4)} ETH
                            </span>
                        </div>
                    </div>
                    <div className="task-summary-modal__action">
                        <span
                            className="btn--cancel"
                            onClick={this._handleCancel}
                        >
                            Cancel
                        </span>
                        <button
                            type="button"
                            className="btn--primary"
                            onClick={this._handleApply}
                            autoFocus
                        >
                            Start Task
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
