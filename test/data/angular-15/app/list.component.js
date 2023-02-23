"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListComponent = void 0;
var core_1 = require("@angular/core");
var ListComponent = /** @class */ (function () {
    function ListComponent() {
    }
    ListComponent.prototype.getId = function (postfix) {
        return this.id + '-item' + postfix;
    };
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", String)
    ], ListComponent.prototype, "id", void 0);
    ListComponent = __decorate([
        (0, core_1.Component)({
            selector: 'list',
            template: "<list-item id=\"{{this.getId('1')}}\"></list-item>\n               <list-item id=\"{{this.getId('2')}}\"></list-item>\n               <list-item id=\"{{this.getId('3')}}\"></list-item>"
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map