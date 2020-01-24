import React, { PureComponent } from 'react';

export default class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.setRef) this.props.setRef(this);
        let _this = this;
        if (_this.props.autoRefresh !== false) _this.refresh();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        if (this.props.setRef) this.props.setRef(null);
    }

    onChangeField = (name, value) => {
        this.setState({fields: {...this.state.fields, [name]: value}}, 
            () => this.validate());
    }
  
    renderField = (meta, item, rowIdx, columnIdx) => {
        let value = meta.render
            ? meta.render(meta, item, rowIdx, columnIdx)
            : meta.dataSource && meta.dataSource.path
                ? this.getValueFromPath(item, meta.dataSource.path, 0)
                : item[meta.name];
        
        var type = meta.type;

        var columnTypeMeta = this.props.globalMeta.columnTypes[type];

        if (columnTypeMeta) {
            if (columnTypeMeta.renderFunc) {
                value = columnTypeMeta.renderFunc(meta.name, value);
            }
        }

        return value;
    }

    validate = () => {
        let errors = undefined;
        for (var k in this.props.meta.fields)
        {
            let fieldMeta = this.props.meta.fields[k];
            let err = undefined;
            let name = fieldMeta.name;
            
            if (fieldMeta.isRequired && !this.state.fields[name]) err = {...err, isEmpty: true};

            if (err) errors = {...errors, [name]: err};
        }
        this.setState({errors: !errors ? {} : errors});
        return !errors;
    }

    refresh = () => {
        //this.setState({isLoading: true});
        if (this.dataSource) {
            //this.dataSource.getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback);
        }
    }

    refreshCallback = (data) => {
        if (!data) {
            this.setState({isLoading: false});
            return;
        }

        if (data.count !== undefined && data.items !== undefined) {
            this.setState({count: data.count, items: data.items, isLoading: false});
        } else if (data.count !== undefined) {
            this.setState({count: data.count, isLoading: false});
        } else if (data.items !== undefined) {
            this.setState({items: data.items, isLoading: false});
        }
        if (this.props.onChangeItems) this.props.onChangeItem(data);
    }

    getComponentProps = (meta) => {
        let globalMeta = this.props.globalMeta.fieldTypes[meta.type] || this.props.globalMeta.fieldTypes[this.props.globalMeta.fieldTypes.default];
        return {
            globalMeta: this.props.globalMeta,
            meta: meta,
            name: meta.name,
            error: this.state.errors[meta.name],
            required: meta.isRequired,
            componentMeta: meta,
            wrappedComponent: globalMeta.component,
            label: this.props.globalMeta.fields.label ? meta.title || meta.name : null,
            placeholder: this.props.globalMeta.fields.placeholder ? meta.title || meta.name : null,
            ...globalMeta.props,
            ...meta.props,
            value: this.state.fields[meta.name],
            onChange: value => this.onChangeField(meta.name, value),
        };
    }

    render() {
        const props = {
            ...this.props, 
            data: this.state,
            functions: {
                renderField: this.renderField,
                onChangeField: this.onChangeField,
                getComponentProps: this.getComponentProps
            },
        };

        const card = React.createElement(this.props.globalMeta.components.card.component, {...props, key: 'Card'});

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel.component, {isLoading: this.state.isLoading}, [card]);

        const errorPanel = React.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props)

        return <React.Fragment>
                {longProcessPanel}
                {errorPanel}
            </React.Fragment>;
    }
}
