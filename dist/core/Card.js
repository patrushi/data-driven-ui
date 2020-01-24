'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_PureComponent) {
    _inherits(Card, _PureComponent);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this2 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this2.onChangeField = function (name, value) {
            _this2.setState({ fields: _extends({}, _this2.state.fields, _defineProperty({}, name, value)) }, function () {
                return _this2.validate();
            });
        };

        _this2.renderField = function (meta, item, rowIdx, columnIdx) {
            var value = meta.render ? meta.render(meta, item, rowIdx, columnIdx) : meta.dataSource && meta.dataSource.path ? _this2.getValueFromPath(item, meta.dataSource.path, 0) : item[meta.name];

            var type = meta.type;

            var columnTypeMeta = _this2.props.globalMeta.columnTypes[type];

            if (columnTypeMeta) {
                if (columnTypeMeta.renderFunc) {
                    value = columnTypeMeta.renderFunc(meta.name, value);
                }
            }

            return value;
        };

        _this2.validate = function () {
            var errors = undefined;
            for (var k in _this2.props.meta.fields) {
                var fieldMeta = _this2.props.meta.fields[k];
                var err = undefined;
                var name = fieldMeta.name;

                if (fieldMeta.isRequired && !_this2.state.fields[name]) err = _extends({}, err, { isEmpty: true });

                if (err) errors = _extends({}, errors, _defineProperty({}, name, err));
            }
            _this2.setState({ errors: !errors ? {} : errors });
            return !errors;
        };

        _this2.refresh = function () {
            //this.setState({isLoading: true});
            if (_this2.dataSource) {
                //this.dataSource.getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback);
            }
        };

        _this2.refreshCallback = function (data) {
            if (!data) {
                _this2.setState({ isLoading: false });
                return;
            }

            if (data.count !== undefined && data.items !== undefined) {
                _this2.setState({ count: data.count, items: data.items, isLoading: false });
            } else if (data.count !== undefined) {
                _this2.setState({ count: data.count, isLoading: false });
            } else if (data.items !== undefined) {
                _this2.setState({ items: data.items, isLoading: false });
            }
            if (_this2.props.onChangeItems) _this2.props.onChangeItem(data);
        };

        _this2.getComponentProps = function (meta) {
            var globalMeta = _this2.props.globalMeta.fieldTypes[meta.type] || _this2.props.globalMeta.fieldTypes[_this2.props.globalMeta.fieldTypes.default];
            return _extends({
                globalMeta: _this2.props.globalMeta,
                meta: meta,
                name: meta.name,
                error: _this2.state.errors[meta.name],
                required: meta.isRequired,
                componentMeta: meta,
                wrappedComponent: globalMeta.component,
                label: _this2.props.globalMeta.fields.label ? meta.title || meta.name : null,
                placeholder: _this2.props.globalMeta.fields.placeholder ? meta.title || meta.name : null
            }, globalMeta.props, meta.props, {
                value: _this2.state.fields[meta.name],
                onChange: function onChange(value) {
                    return _this2.onChangeField(meta.name, value);
                }
            });
        };

        _this2.state = {
            fields: {},
            errors: {}
        };
        return _this2;
    }

    _createClass(Card, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.setRef) this.props.setRef(this);
            var _this = this;
            if (_this.props.autoRefresh !== false) _this.refresh();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.setRef) this.props.setRef(null);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = _extends({}, this.props, {
                data: this.state,
                functions: {
                    renderField: this.renderField,
                    onChangeField: this.onChangeField,
                    getComponentProps: this.getComponentProps
                }
            });

            var card = _react2.default.createElement(this.props.globalMeta.components.card.component, _extends({}, props, { key: 'Card' }));

            var longProcessPanel = _react2.default.createElement(this.props.globalMeta.components.longProcessPanel.component, { isLoading: this.state.isLoading }, [card]);

            var errorPanel = _react2.default.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                longProcessPanel,
                errorPanel
            );
        }
    }]);

    return Card;
}(_react.PureComponent);

exports.default = Card;