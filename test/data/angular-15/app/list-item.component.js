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
exports.ListItemComponent = void 0;
var core_1 = require("@angular/core");
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent() {
    }
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", String)
    ], ListItemComponent.prototype, "id", void 0);
    ListItemComponent = __decorate([
        (0, core_1.Component)({
            selector: 'list-item',
            template: '<p>{{id}}</p>'
        })
    ], ListItemComponent);
    return ListItemComponent;
}());
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=list-item.component.js.map