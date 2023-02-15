"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logging {
}
exports.default = Logging;
_a = Logging;
// public static log = (args:any)=> this.info(args);
Logging.log = (args) => _a.info(args);
Logging.success = (args) => console.log(chalk_1.default.green(`[${new Date().toLocaleString()}][✔]`), typeof args === "string" ? chalk_1.default.greenBright(args) : args);
Logging.info = (args) => console.log(chalk_1.default.blue(`[${new Date().toLocaleString()}][ℹ]`), typeof args === "string" ? chalk_1.default.blueBright(args) : args);
Logging.warn = (args) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}][⚠]`), typeof args === "string" ? chalk_1.default.yellowBright(args) : args);
Logging.error = (args) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}][⚠]`), typeof args === "string" ? chalk_1.default.redBright(args) : args);
