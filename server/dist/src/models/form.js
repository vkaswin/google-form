"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FormSchema = new mongoose_1.Schema({
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    bgCode: {
        type: String,
        required: true,
    },
    colorCode: {
        type: String,
        required: true,
    },
    sections: {
        required: true,
        type: [
            {
                title: {
                    default: "",
                    type: String,
                },
                description: {
                    default: "",
                    type: String,
                },
                fields: {
                    required: true,
                    type: [
                        {
                            title: {
                                default: "",
                                type: String,
                            },
                            description: {
                                default: "",
                                type: String,
                            },
                            fieldType: {
                                type: String,
                                required: true,
                            },
                            options: {
                                default: [],
                                type: [String],
                            },
                            other: {
                                default: false,
                                type: Boolean,
                            },
                            rules: {
                                default: {},
                                type: {
                                    required: {
                                        value: Boolean,
                                        message: String,
                                    },
                                    pattern: {
                                        value: String,
                                        message: String,
                                    },
                                    minlength: {
                                        value: Number,
                                        message: String,
                                    },
                                    maxlength: {
                                        value: Number,
                                        message: String,
                                    },
                                    min: {
                                        value: String,
                                        message: String,
                                    },
                                    max: {
                                        value: String,
                                        message: String,
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Form", FormSchema);
