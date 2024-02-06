(self["webpackChunkploomber_extension"] = self["webpackChunkploomber_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/const/env.js":
/*!**************************!*\
  !*** ./lib/const/env.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEPLOYMENT_ENDPOINTS: () => (/* binding */ DEPLOYMENT_ENDPOINTS),
/* harmony export */   DOCS: () => (/* binding */ DOCS)
/* harmony export */ });
const DEPLOYMENT_ENDPOINTS = {
    NEW_JOB: "https://platform.ploomber.io/dashboards/",
    NEW_NOTEBOOK: "https://platform.ploomber.io/notebooks",
};
const DOCS = {
    GET_API_KEY: "https://docs.cloud.ploomber.io/en/latest/quickstart/apikey.html",
    VOILA_EXAMPLES: "https://docs.cloud.ploomber.io/en/latest/examples/voila.html",
};


/***/ }),

/***/ "./lib/deploy-notebook/index.js":
/*!**************************************!*\
  !*** ./lib/deploy-notebook/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeployingExtension: () => (/* binding */ DeployingExtension),
/* harmony export */   plugin_sharing: () => (/* binding */ plugin_sharing)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialog */ "./lib/dialog.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./lib/settings/index.js");




/**
 * A notebook widget extension that adds a deployment button to the toolbar.
 */
class DeployingExtension {
    /**
     * Create a new extension for the notebook panel widget.
     *
     * @param panel Notebook panel
     * @param context Notebook context
     * @returns Disposable on the added button
     */
    constructor() {
        this._onSettingsChanged = (sender, settings) => {
            if (!settings.showDeployNotebook) {
                this.deployNotebookButton.parent = null;
            }
            else {
                this.panel.toolbar.insertItem(10, 'deployNB', this.deployNotebookButton);
            }
        };
        _settings__WEBPACK_IMPORTED_MODULE_2__.settingsChanged.connect(this._onSettingsChanged);
    }
    createNew(panel, context) {
        const clickDeploy = () => {
            (0,_dialog__WEBPACK_IMPORTED_MODULE_3__.showUploadDialog)(panel, context);
        };
        this.panel = panel;
        this.deployNotebookButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            className: 'share-nb-button',
            label: 'Share Notebook',
            onClick: clickDeploy,
            tooltip: 'Share notebook by uploading it to Ploomber Cloud',
        });
        this.deployNotebookButton.node.setAttribute("data-testid", "share-btn");
        panel.toolbar.insertItem(10, 'deployNB', this.deployNotebookButton);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            this.deployNotebookButton.dispose();
        });
    }
}
/**
 * Activate the extension.
 *
 * @param app Main application object
 */
const plugin_sharing = {
    activate: (app) => {
        app.docRegistry.addWidgetExtension('Notebook', new DeployingExtension());
    },
    autoStart: true,
    id: "sharing",
    requires: []
};



/***/ }),

/***/ "./lib/dialog.js":
/*!***********************!*\
  !*** ./lib/dialog.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeployDialogContent: () => (/* binding */ DeployDialogContent),
/* harmony export */   UploadDialogContent: () => (/* binding */ UploadDialogContent),
/* harmony export */   showDeploymentDialog: () => (/* binding */ showDeploymentDialog),
/* harmony export */   showUploadDialog: () => (/* binding */ showUploadDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "webpack/sharing/consume/default/@mui/material/@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_CloudQueue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/CloudQueue */ "./node_modules/@mui/icons-material/CloudQueue.js");
/* harmony import */ var _const_env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./const/env */ "./lib/const/env.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/util */ "./lib/utils/util.js");







function showDeploymentDialog(panel, context) {
    const dialogWidget = new DeployWidget({ notebookPath: panel.context.contentsModel.path, metadata: panel.model.metadata, context: context });
    var deploymentDialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog({
        title: 'Deploy Notebook', body: dialogWidget, buttons: [
            {
                label: "Close",
                caption: "",
                className: "bg-info",
                accept: false,
                actions: [],
                displayType: "default",
                iconClass: "",
                iconLabel: "",
                ariaLabel: "Close dialog",
            }
        ]
    });
    return deploymentDialog.launch();
}
function showUploadDialog(panel, context) {
    const dialogWidget = new UploadWidget({ notebookPath: panel.context.contentsModel.path, metadata: panel.model.metadata, context: context });
    var deploymentDialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog({
        title: 'Share Notebook', body: dialogWidget, buttons: [
            {
                ariaLabel: "Close dialog",
                label: "Close",
                caption: "",
                className: "bg-info",
                accept: false,
                actions: [],
                displayType: "default",
                iconClass: "",
                iconLabel: "",
            }
        ]
    });
    return deploymentDialog.launch();
}
const ErrorMessageArea = (props) => {
    var _a, _b, _c, _d, _e, _f;
    // Special handle for missing file
    if (((_a = props === null || props === void 0 ? void 0 : props.message) === null || _a === void 0 ? void 0 : _a.type) == "missing file") {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { "data-testid": "error-message-area" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, { variant: "subtitle1", gutterBottom: true },
                " A ",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, (_c = (_b = props === null || props === void 0 ? void 0 : props.message) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.fileName),
                " file with dependencies is required to deploy your notebook. Please add it at ",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, (_e = (_d = props === null || props === void 0 ? void 0 : props.message) === null || _d === void 0 ? void 0 : _d.detail) === null || _e === void 0 ? void 0 : _e.filePath),
                ". To learn more, see the ",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://docs.cloud.ploomber.io/en/latest/apps/jupyterlab-plugin.html" }, "docs"))));
    }
    else {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, { variant: "subtitle1", gutterBottom: true }, (_f = props === null || props === void 0 ? void 0 : props.message) === null || _f === void 0 ? void 0 : _f.detail));
    }
};
const DeployDialogContent = (props) => {
    var _a, _b;
    // For deployment workflow, we need:
    // 1. The path of notebook file
    // 2. project_id value stored in notebook file
    const notebook_relative_path = props.notebook_path;
    const [projectId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(((_b = (_a = props === null || props === void 0 ? void 0 : props.metadata) === null || _a === void 0 ? void 0 : _a.get("ploomber")) === null || _b === void 0 ? void 0 : _b.project_id) || "");
    const [isLoadingRemoteAPI, setIsLoadingRemoteAPI] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [isLoadingDeployStatus, setIsLoadingDeployStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isShowSnackbar, setIsShowSnackbar] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isShowFirstTimeDeployPrompt, setIsShowFirstTimeDeployPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [APIKey, setAPIKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [deploymentURL, setDeploymentURL] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [APIValidStatus, setAPIValidStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("init");
    const [deployErrorMessage, setDeployErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [snakebarMessage, setSnakebarMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        fetchAPIKey();
    }, []);
    // When API Key is verified, init. the first time deployment flow
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (APIValidStatus === "success") {
            if (!projectId) {
                setIsShowFirstTimeDeployPrompt(true);
            }
            else {
                setIsShowFirstTimeDeployPrompt(false);
                deployNotebook();
            }
        }
    }, [APIValidStatus]);
    // The API Key should stored in config file
    const fetchAPIKey = async () => {
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('apikey')
            .then(response => {
            if ((response === null || response === void 0 ? void 0 : response.data) != null) {
                setAPIKey(response.data);
                setAPIValidStatus("success");
            }
        }).catch(reason => {
            console.error(`The ploomber_extension server extension appears to be missing.\n${reason}`);
        });
        setIsLoadingRemoteAPI(false);
    };
    const onSaveAPIKey = async () => {
        // When the user enters the API Key, store in the config file through /dashboard/apikey API
        setIsLoadingRemoteAPI(true);
        const dataToSend = { 'api_key': APIKey };
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('apikey', {
            body: JSON.stringify(dataToSend),
            method: 'POST'
        }).then(response => {
            if ((response === null || response === void 0 ? void 0 : response.result) == "success") {
                setAPIValidStatus("success");
            }
            else {
                setAPIValidStatus("error");
            }
        }).catch(reason => {
            console.error(`Error on POST ${dataToSend}.\n${reason}`);
        });
        setIsLoadingRemoteAPI(false);
    };
    const onClickFirstTimeDeploy = async () => {
        setIsShowFirstTimeDeployPrompt(false);
        await deployNotebook();
    };
    const deployNotebook = async () => {
        setIsLoadingDeployStatus(true);
        const dataToSend = { 'notebook_path': notebook_relative_path, 'api_key': APIKey, 'project_id': projectId };
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('job', {
            body: JSON.stringify(dataToSend),
            method: 'POST'
        }).then(reply => {
            var _a;
            var result = reply["deployment_result"];
            var errorMsg = {
                type: "generic",
                detail: ""
            };
            if ((result === null || result === void 0 ? void 0 : result.type) === "missing file" && (result === null || result === void 0 ? void 0 : result.detail)) {
                errorMsg.type = result.type;
                errorMsg.detail = {
                    fileName: "requirements.txt",
                    filePath: result.detail
                };
                setDeployErrorMessage(errorMsg);
            }
            else if ((result === null || result === void 0 ? void 0 : result.detail) || (result === null || result === void 0 ? void 0 : result.message)) {
                errorMsg.detail = result.detail || result.message;
                setDeployErrorMessage(errorMsg);
            }
            else {
                setDeploymentURL(_const_env__WEBPACK_IMPORTED_MODULE_4__.DEPLOYMENT_ENDPOINTS.NEW_JOB + (result === null || result === void 0 ? void 0 : result.project_id) + "/" + (result === null || result === void 0 ? void 0 : result.id));
                props.metadata.ploomber = { "project_id": result === null || result === void 0 ? void 0 : result.project_id };
                (_a = props === null || props === void 0 ? void 0 : props.context) === null || _a === void 0 ? void 0 : _a.save();
            }
            // Write into notebook projectID
        });
        setIsLoadingDeployStatus(false);
    };
    const APITextFieldProps = {
        "init": {
            label: "API Key",
            variant: "outlined",
            color: "primary"
        },
        "success": {
            label: "Valid API Key",
            variant: "filled",
            color: "success"
        },
        "error": {
            label: "Please enter valid API Key",
            variant: "filled",
            color: "warning"
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, { p: 6, style: { width: 600 } }, isLoadingRemoteAPI || isLoadingDeployStatus ?
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, { sx: {
                display: 'flex', justifyContent: "center",
                alignItems: "center"
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.CircularProgress, null))
        : react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { container: true, spacing: 4, alignItems: "center", direction: "column" },
                APIValidStatus !== "success" &&
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", justifyContent: "flex-start", width: "100%", my: 2 },
                            "Deploy this notebook as a web application with Ploomber Cloud. ",
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Link, { href: _const_env__WEBPACK_IMPORTED_MODULE_4__.DOCS.VOILA_EXAMPLES, target: "_blank", rel: "noopener noreferrer" }, " Click here to learn more.")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", width: "100%" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { container: true, direction: "row", alignItems: "center", spacing: 1 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, xs: 10 },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.TextField, { id: "api-key-input", size: "small", onChange: (val) => { setAPIKey(val.target.value); }, value: APIKey, label: APITextFieldProps[APIValidStatus]["label"], variant: APITextFieldProps[APIValidStatus]["variant"], color: APITextFieldProps[APIValidStatus]["color"], error: APIValidStatus == "error", fullWidth: true, focused: true })),
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, xs: 2, alignItems: "center", justifyContent: "center" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onSaveAPIKey, variant: "contained", size: "small" }, "CONFIRM")))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", width: "100%", my: 2 },
                            "You need an API key to deploy this notebook.\u00A0",
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Link, { href: _const_env__WEBPACK_IMPORTED_MODULE_4__.DOCS.GET_API_KEY, target: "_blank", rel: "noopener noreferrer" }, "Click here to get an API Key"))),
                APIValidStatus === "success" &&
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, alignItems: "center", spacing: 4, direction: "column" }, !isShowFirstTimeDeployPrompt ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, deployErrorMessage ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorMessageArea, { message: deployErrorMessage }) :
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, justifyContent: "center", xs: 12 }, "Check your deployment status here:"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, justifyContent: "center", xs: 12 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Chip, { label: deploymentURL, variant: "outlined", onClick: () => {
                                        window.open(deploymentURL);
                                        setIsShowSnackbar(true);
                                        setSnakebarMessage("Deployment Success");
                                    } }),
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Snackbar, { open: isShowSnackbar, onClose: () => setIsShowSnackbar(false), autoHideDuration: 2000, message: snakebarMessage })))) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, { variant: "subtitle1", gutterBottom: true }, "Confirm that you want to deploy this notebook to Ploomber Cloud"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onClickFirstTimeDeploy, variant: "contained", size: "small", color: "primary", disabled: deploymentURL !== "", endIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_CloudQueue__WEBPACK_IMPORTED_MODULE_5__["default"], null) }, "CONFIRM "))))))));
};
const UploadDialogContent = (props) => {
    const notebook_relative_path = props.notebook_path;
    const [isLoadingRemoteAPI, setIsLoadingRemoteAPI] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [isLoadingDeployStatus, setIsLoadingDeployStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isShowSnackbar, setIsShowSnackbar] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isShowFirstTimeDeployPrompt, setIsShowFirstTimeDeployPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [APIKey, setAPIKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [deploymentURL, setDeploymentURL] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [APIValidStatus, setAPIValidStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("init");
    const [deployErrorMessage, setDeployErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [snakebarMessage, setSnakebarMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        fetchAPIKey();
    }, []);
    // When API Key is verified, init. the first time deployment flow
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (APIValidStatus === "success") {
            setIsShowFirstTimeDeployPrompt(true);
        }
    }, [APIValidStatus]);
    // The API Key should stored in config file
    const fetchAPIKey = async () => {
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('apikey')
            .then(response => {
            if ((response === null || response === void 0 ? void 0 : response.data) != null) {
                setAPIKey(response.data);
                setAPIValidStatus("success");
            }
        }).catch(reason => {
            console.error(`The ploomber_extension server extension appears to be missing.\n${reason}`);
        });
        setIsLoadingRemoteAPI(false);
    };
    const onSaveAPIKey = async () => {
        // When the user enters the API Key, store in the config file through /dashboard/apikey API
        setIsLoadingRemoteAPI(true);
        const dataToSend = { 'api_key': APIKey };
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('apikey', {
            body: JSON.stringify(dataToSend),
            method: 'POST'
        }).then(response => {
            if ((response === null || response === void 0 ? void 0 : response.result) == "success") {
                setAPIValidStatus("success");
            }
            else {
                setAPIValidStatus("error");
            }
        }).catch(reason => {
            console.error(`Error on POST ${dataToSend}.\n${reason}`);
        });
        setIsLoadingRemoteAPI(false);
    };
    const onClickFirstTimeDeploy = async () => {
        setIsShowFirstTimeDeployPrompt(false);
        await uploadNotebook();
    };
    const uploadNotebook = async () => {
        setIsLoadingDeployStatus(true);
        const dataToSend = { 'notebook_path': notebook_relative_path, 'api_key': APIKey };
        await (0,_utils_util__WEBPACK_IMPORTED_MODULE_3__.requestAPI)('nb-upload', {
            body: JSON.stringify(dataToSend),
            method: 'POST'
        }).then(reply => {
            var _a;
            var result = reply["deployment_result"];
            var errorMsg = {
                type: "generic",
                detail: ""
            };
            if ((result === null || result === void 0 ? void 0 : result.type) === "missing file" && (result === null || result === void 0 ? void 0 : result.detail)) {
                errorMsg.type = result.type;
                errorMsg.detail = {
                    fileName: "requirements.txt",
                    filePath: result.detail
                };
                setDeployErrorMessage(errorMsg);
            }
            else if ((result === null || result === void 0 ? void 0 : result.detail) || (result === null || result === void 0 ? void 0 : result.message)) {
                errorMsg.detail = result.detail || result.message;
                setDeployErrorMessage(errorMsg);
            }
            else {
                setDeploymentURL(_const_env__WEBPACK_IMPORTED_MODULE_4__.DEPLOYMENT_ENDPOINTS.NEW_NOTEBOOK + "/" + (result === null || result === void 0 ? void 0 : result.id));
                props.metadata.ploomber = { "project_id": result === null || result === void 0 ? void 0 : result.project_id };
                (_a = props === null || props === void 0 ? void 0 : props.context) === null || _a === void 0 ? void 0 : _a.save();
            }
            // Write into notebook projectID
        });
        setIsLoadingDeployStatus(false);
    };
    const APITextFieldProps = {
        "init": {
            label: "API Key",
            variant: "outlined",
            color: "primary"
        },
        "success": {
            label: "Valid API Key",
            variant: "filled",
            color: "success"
        },
        "error": {
            label: "Please enter valid API Key",
            variant: "filled",
            color: "warning"
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, { p: 6, style: { width: 600 } }, isLoadingRemoteAPI || isLoadingDeployStatus ?
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, { sx: {
                display: 'flex', justifyContent: "center",
                alignItems: "center"
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.CircularProgress, null))
        : react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { container: true, spacing: 4, alignItems: "center", direction: "column" },
                APIValidStatus !== "success" &&
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", justifyContent: "flex-start", width: "100%", my: 2 },
                            "Upload this notebook to Ploomber Cloud to share it with anyone. ",
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Link, { href: _const_env__WEBPACK_IMPORTED_MODULE_4__.DOCS.VOILA_EXAMPLES, target: "_blank", rel: "noopener noreferrer" }, " Click here to learn more.")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", width: "100%" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { container: true, direction: "row", alignItems: "center", spacing: 1 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, xs: 10 },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.TextField, { id: "api-key-input", size: "small", onChange: (val) => { setAPIKey(val.target.value); }, value: APIKey, label: APITextFieldProps[APIValidStatus]["label"], variant: APITextFieldProps[APIValidStatus]["variant"], color: APITextFieldProps[APIValidStatus]["color"], error: APIValidStatus == "error", fullWidth: true, focused: true })),
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, xs: 2, alignItems: "center", justifyContent: "center" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onSaveAPIKey, variant: "contained", size: "small" }, "CONFIRM")))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, direction: 'row', alignItems: "center", width: "100%", my: 2 },
                            "You need an API key to upload this notebook.\u00A0",
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Link, { href: _const_env__WEBPACK_IMPORTED_MODULE_4__.DOCS.GET_API_KEY, target: "_blank", rel: "noopener noreferrer" }, "Click here to get an API Key"))),
                APIValidStatus === "success" &&
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, container: true, alignItems: "center", spacing: 4, direction: "column" }, !isShowFirstTimeDeployPrompt ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, deployErrorMessage ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorMessageArea, { message: deployErrorMessage }) :
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, justifyContent: "center", xs: 12 }, "Your notebook is available here:"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Grid, { item: true, justifyContent: "center", xs: 12 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Chip, { label: deploymentURL, variant: "outlined", onClick: () => {
                                        window.open(deploymentURL);
                                        setIsShowSnackbar(true);
                                        setSnakebarMessage("Deployment Success");
                                    } }),
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Snackbar, { open: isShowSnackbar, onClose: () => setIsShowSnackbar(false), autoHideDuration: 2000, message: snakebarMessage })))) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, { variant: "subtitle1", gutterBottom: true }, "Confirm that you want to upload this notebook to Ploomber Cloud"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onClickFirstTimeDeploy, variant: "contained", size: "small", color: "primary", disabled: deploymentURL !== "", endIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_CloudQueue__WEBPACK_IMPORTED_MODULE_5__["default"], null) }, "CONFIRM "))))))));
};
class DeployWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget {
    constructor(props) {
        super();
        this.state = {
            notebookPath: props.notebookPath,
            metadata: props.metadata,
            context: props.context
        };
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DeployDialogContent, { notebook_path: this.state.notebookPath, metadata: this.state.metadata, context: this.state.context });
    }
}
class UploadWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget {
    constructor(props) {
        super();
        this.state = {
            notebookPath: props.notebookPath,
            metadata: props.metadata,
            context: props.context
        };
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(UploadDialogContent, { notebook_path: this.state.notebookPath, metadata: this.state.metadata, context: this.state.context });
    }
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODULE_NAME: () => (/* reexport safe */ _version__WEBPACK_IMPORTED_MODULE_0__.MODULE_NAME),
/* harmony export */   MODULE_VERSION: () => (/* reexport safe */ _version__WEBPACK_IMPORTED_MODULE_0__.MODULE_VERSION),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settings_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings/index */ "./lib/settings/index.js");
/* harmony import */ var _deploy_notebook_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deploy-notebook/index */ "./lib/deploy-notebook/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./lib/version.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    _settings_index__WEBPACK_IMPORTED_MODULE_1__.plugin_settings,
    _deploy_notebook_index__WEBPACK_IMPORTED_MODULE_2__.plugin_sharing
]);


/***/ }),

/***/ "./lib/settings/index.js":
/*!*******************************!*\
  !*** ./lib/settings/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   plugin_settings: () => (/* binding */ plugin_settings),
/* harmony export */   settingsChanged: () => (/* binding */ settingsChanged)
/* harmony export */ });
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);

 // Import the Signal class
const PLUGIN_ID = 'ploomber-extension:settings';
const settingsChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal({});
/**
 * Initialization data for the settings extension.
 */
const plugin_settings = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry],
    activate: (app, settings, panel) => {
        /**
         * Load the settings for this extension
         *
         * @param setting Extension settings
         */
        function loadSetting(setting) {
            const showDeployNotebook = setting.get('showDeployNotebook').composite;
            const showFormatSQL = setting.get('showFormatSQL').composite;
            settingsChanged.emit({ showDeployNotebook, showFormatSQL });
        }
        // Wait for the application to be restored and
        // for the settings for this plugin to be loaded
        Promise.all([app.restored, settings.load(PLUGIN_ID)])
            .then(([, setting]) => {
            // Read the settings
            loadSetting(setting);
            // Listen for your plugin setting changes using Signal
            setting.changed.connect(loadSetting);
        })
            .catch((reason) => {
            console.error(`Something went wrong when reading the settings.\n${reason}`);
        });
    },
};



/***/ }),

/***/ "./lib/utils/util.js":
/*!***************************!*\
  !*** ./lib/utils/util.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestAPI: () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI(endPoint = '', init = {}) {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, 'ploomber', // API Namespace
    endPoint);
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    let data = await response.text();
    if (data.length > 0) {
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            console.log('Not a JSON response body.', response);
        }
    }
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, data.message || data);
    }
    return data;
}


/***/ }),

/***/ "./lib/version.js":
/*!************************!*\
  !*** ./lib/version.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODULE_NAME: () => (/* binding */ MODULE_NAME),
/* harmony export */   MODULE_VERSION: () => (/* binding */ MODULE_VERSION)
/* harmony export */ });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = __webpack_require__(/*! ../package.json */ "./package.json");
/**
 * The _model_module_version/_view_module_version this package implements.
 *
 * The html widget manager assumes that this is the same as the npm package
 * version number.
 */
const MODULE_VERSION = data.version;
/*
 * The current package name.
 */
const MODULE_NAME = data.name;


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@mui/icons-material/CloudQueue.js":
/*!********************************************************!*\
  !*** ./node_modules/@mui/icons-material/CloudQueue.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

"use client";

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _default = exports["default"] = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3"
}), 'CloudQueue');

/***/ }),

/***/ "./node_modules/@mui/icons-material/utils/createSvgIcon.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mui/icons-material/utils/createSvgIcon.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

'use client';

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return _utils.createSvgIcon;
  }
}));
var _utils = __webpack_require__(/*! @mui/material/utils */ "./node_modules/@mui/material/utils/index.js");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"ploomber-extension","version":"0.1.0","description":"A JupyterLab extension.","keywords":["jupyter","jupyterlab","jupyterlab-extension"],"homepage":"https://github.com/neelasha23/ploomber-extension.git","bugs":{"url":"https://github.com/neelasha23/ploomber-extension.git/issues"},"license":"BSD-3-Clause","author":"Ploomber","files":["lib/**/*.{d.ts,eot,gif,html,jpg,js,js.map,json,png,svg,woff2,ttf}","style/**/*.{css,js,eot,gif,html,jpg,json,png,svg,woff2,ttf}","src/**/*.{ts,tsx}","settings-schema/**/*.json"],"main":"lib/index.js","types":"lib/index.d.ts","style":"style/index.css","repository":{"type":"git","url":"https://github.com/neelasha23/ploomber-extension.git.git"},"scripts":{"build":"jlpm build:lib && jlpm build:labextension:dev","build:prod":"jlpm clean && jlpm build:lib:prod && jlpm build:labextension","build:labextension":"jupyter labextension build .","build:labextension:dev":"jupyter labextension build --development True .","build:lib":"tsc --sourceMap","build:lib:prod":"tsc","clean":"jlpm clean:lib","clean:lib":"rimraf lib tsconfig.tsbuildinfo","clean:lintcache":"rimraf .eslintcache .stylelintcache","clean:labextension":"rimraf ploomber_extension/labextension ploomber_extension/_version.py","clean:all":"jlpm clean:lib && jlpm clean:labextension && jlpm clean:lintcache","eslint":"jlpm eslint:check --fix","eslint:check":"eslint src/ --cache --ext .ts,.tsx","install:extension":"jlpm build","lint":"jlpm stylelint && jlpm prettier && jlpm eslint","lint:check":"jlpm stylelint:check && jlpm prettier:check && jlpm eslint:check","prettier":"jlpm prettier:base --write --list-different","prettier:base":"prettier \\"**/*{.ts,.tsx,.js,.jsx,.css,.json,.md}\\"","prettier:check":"jlpm prettier:base --check","stylelint":"jlpm stylelint:check --fix","stylelint:check":"stylelint --cache \\"style/**/*.css\\"","test":"jest --coverage","watch":"run-p watch:src watch:labextension","watch:src":"tsc -w --sourceMap","watch:labextension":"jupyter labextension watch ."},"dependencies":{"@emotion/react":"^11.11.3","@emotion/styled":"^11.11.0","@jupyterlab/application":"^4.0.0","@jupyterlab/coreutils":"^6.0.0","@jupyterlab/services":"^7.0.0","@mui/icons-material":"^5.15.7","@mui/material":"^5.15.7"},"devDependencies":{"@jupyterlab/builder":"^4.0.0","@jupyterlab/testutils":"^4.0.0","@types/jest":"^29.2.0","@types/json-schema":"^7.0.11","@types/react":"^18.0.26","@types/react-addons-linked-state-mixin":"^0.14.22","@typescript-eslint/eslint-plugin":"^6.1.0","@typescript-eslint/parser":"^6.1.0","css-loader":"^6.7.1","eslint":"^8.36.0","eslint-config-prettier":"^8.8.0","eslint-plugin-prettier":"^5.0.0","jest":"^29.2.0","mkdirp":"^1.0.3","npm-run-all":"^4.1.5","prettier":"^3.0.0","rimraf":"^5.0.1","source-map-loader":"^1.0.2","style-loader":"^3.3.1","stylelint":"^15.10.1","stylelint-config-recommended":"^13.0.0","stylelint-config-standard":"^34.0.0","stylelint-csstree-validator":"^3.0.0","stylelint-prettier":"^4.0.0","typescript":"~5.0.2","yjs":"^13.5.0"},"sideEffects":["style/*.css","style/index.js"],"styleModule":"style/index.js","publishConfig":{"access":"public"},"jupyterlab":{"extension":true,"schemaDir":"settings-schema","outputDir":"ploomber_extension/labextension","sharedPackages":{}},"eslintConfig":{"extends":["eslint:recommended","plugin:@typescript-eslint/eslint-recommended","plugin:@typescript-eslint/recommended","plugin:prettier/recommended"],"parser":"@typescript-eslint/parser","parserOptions":{"project":"tsconfig.json","sourceType":"module"},"plugins":["@typescript-eslint"],"rules":{"@typescript-eslint/naming-convention":["error",{"selector":"interface","format":["PascalCase"],"custom":{"regex":"^I[A-Z]","match":true}}],"@typescript-eslint/no-unused-vars":["warn",{"args":"none"}],"@typescript-eslint/no-explicit-any":"off","@typescript-eslint/no-namespace":"off","@typescript-eslint/no-use-before-define":"off","@typescript-eslint/quotes":["error","single",{"avoidEscape":true,"allowTemplateLiterals":false}],"curly":["error","all"],"eqeqeq":"error","prefer-arrow-callback":"error"}},"prettier":{"singleQuote":true,"trailingComma":"none","arrowParens":"avoid","endOfLine":"auto","overrides":[{"files":"package.json","options":{"tabWidth":4}}]},"stylelint":{"extends":["stylelint-config-recommended","stylelint-config-standard","stylelint-prettier/recommended"],"plugins":["stylelint-csstree-validator"],"rules":{"csstree/validator":true,"property-no-vendor-prefix":null,"selector-class-pattern":"^([a-z][A-z\\\\d]*)(-[A-z\\\\d]+)*$","selector-no-vendor-prefix":null,"value-no-vendor-prefix":null}}}');

/***/ })

}]);
//# sourceMappingURL=lib_index_js.74a06ebacec8586893a1.js.map