'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var equal = require('fast-deep-equal');

var SmartPanel = function (_PureComponent) {
    _inherits(SmartPanel, _PureComponent);

    function SmartPanel(props) {
        _classCallCheck(this, SmartPanel);

        var _this = _possibleConstructorReturn(this, (SmartPanel.__proto__ || Object.getPrototypeOf(SmartPanel)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            detailTab: 0,
            isEditCardOpen: false,
            masterCurrentKey: null,
            masterCurrentItem: null
        };
        return _this;
    }

    _createClass(SmartPanel, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /* if (!equal(this.currentProps, this.props)) {
                this.currentProps = this.props;
                this.setState({
                    detailTab: this.props.detailTab,
                    isEditCardOpen: this.props.open,
                    masterCurrentKey: this.props.key,
                    masterCurrentItem: this.props.item
                });
            } */
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var components = [];
            if (this.props.type === 'list-card') {
                if (this.props.list) {
                    var component = this.mixinProps(this.props.list, function (component) {
                        return {
                            key: 'list',
                            onEdit: function onEdit(item) {
                                return _this2.setState({ masterCurrentItem: item, isEditCardOpen: true });
                            },
                            setRef: function setRef(ref) {
                                return _this2.setState({ masterRef: ref });
                            }
                        };
                    });
                    components.push(component);
                }
                if (this.props.card) {
                    var _component = this.mixinProps(this.props.card, function (component) {
                        return {
                            key: 'card',
                            open: _this2.state.isEditCardOpen,
                            item: _this2.state.masterCurrentItem,
                            onClose: function onClose(change) {
                                _this2.setState({ isEditCardOpen: false });
                                if (change) _this2.state.masterRef.refresh(true);
                            }
                        };
                    });
                    components.push(_component);
                }
            } else if (this.props.type === 'master-detail') {
                if (this.props.master) {
                    var _component2 = this.mixinProps(this.props.master, function (component) {
                        return {
                            key: 'master',
                            onSingleSelect: function onSingleSelect(selectKey) {
                                _this2.onSingleSelect(selectKey);component.props.onSingleSelect(selectKey);
                            },
                            setRef: function setRef(ref) {
                                return _this2.setState({ masterRef: ref });
                            }
                        };
                    });
                    components.push(_component2);
                }
                if (this.props.detail) {
                    var _component3 = this.mixinProps(this.props.detail, function (component) {
                        return {
                            key: 'detail',
                            masterKey: _this2.state.masterCurrentKey
                        };
                    });
                    components.push(_component3);
                }
            }
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                components
            );
        }
    }]);

    return SmartPanel;
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.mixinProps = function (component, propsFunc, children) {
        var props = component.props;
        if (propsFunc) props = _extends({}, props, propsFunc(component));
        if (children) props = _extends({}, props, { children: children });
        return _react2.default.isValidElement(component) ? _react2.default.cloneElement(component, props) : component;
    };

    this.mixinPropsInArray = function (components, propsFunc) {
        return _react2.default.Children.map(components, function (component) {
            return _this3.mixinProps(component, propsFunc);
        });
    };

    this.onSingleSelect = function (selectKey) {
        _this3.setState({ masterCurrentKey: selectKey });
    };
};

exports.default = SmartPanel;