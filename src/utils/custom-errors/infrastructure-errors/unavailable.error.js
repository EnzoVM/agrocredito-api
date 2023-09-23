"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var response_codes_1 = require("../../standar-response/response.codes");
var UnavailableError = /** @class */ (function (_super) {
    __extends(UnavailableError, _super);
    function UnavailableError(_a) {
        var message = _a.message, core = _a.core;
        var _this = _super.call(this, message) || this;
        _this.code = response_codes_1.ResponseCodes.UNAVAILABLE_SERVICE;
        _this.core = core;
        return _this;
    }
    return UnavailableError;
}(Error));
exports.default = UnavailableError;
