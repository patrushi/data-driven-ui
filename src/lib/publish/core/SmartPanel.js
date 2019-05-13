import React, { PureComponent } from 'react';
var equal = require('fast-deep-equal');

export default class SmartPanel extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            detailTab: 0,
            isEditCardOpen: false,
            masterCurrentKey: null,
            masterCurrentItem: null
        };
    }

    mixinProps = (component, propsFunc, children) => {
        let props = component.props;
        if (propsFunc) props = {...props, ...propsFunc(component)};
        if (children) props = {...props, children};
        return React.isValidElement(component) ? React.cloneElement(component, props) : component;
    }
    
    mixinPropsInArray = (components, propsFunc) => {
       return React.Children.map(components, component => this.mixinProps(component, propsFunc));
    }

    onSingleSelect = (selectKey) => {
        this.setState({masterCurrentKey: selectKey});
    }

    componentDidUpdate() {
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

    // bind functions
    onListEdit = (item) => this.setState({masterCurrentItem: item, isEditCardOpen: true});
    onListSetRef = (ref) => this.setState({listRef: ref});
    onCardClose = (change) => {
        this.setState({isEditCardOpen: false});
        if (change) this.state.listRef.refresh(true);
    };
    onMasterSingleSelect = (selectKey) => {this.onSingleSelect(selectKey); /* component.props.onSingleSelect(selectKey);*/};
    onMasterSetRef = (ref) => this.setState({masterRef: ref});

    render() {
        let components = [];
        if (this.props.type === 'list-card') {
            if (this.props.list) {
                let component = this.mixinProps(this.props.list, component => {return {
                    key: 'list', 
                    onEdit: this.onListEdit,
                    setRef: this.onListSetRef
                }})
                components.push(component);
            }
            if (this.props.card) {
                let component = this.mixinProps(this.props.card, component => {return {
                    key: 'card', 
                    open: this.state.isEditCardOpen,
                    item: this.state.masterCurrentItem,
                    onClose: this.onCardClose
                }});
                components.push(component);
            }
        } else if (this.props.type === 'master-detail') {
            if (this.props.master) {
                let component = this.mixinProps(this.props.master, component => {return {
                    key: 'master', 
                    onSingleSelect: this.onMasterSingleSelect,
                    setRef: this.onMasterSetRef
                }})
                components.push(component);
            }
            if (this.props.detail) {
                let component = this.mixinProps(this.props.detail, component => {return {
                    key: 'detail', 
                    masterKey: this.state.masterCurrentKey
                }})
                components.push(component);
            }
        }
        console.trace();
        return (
            <React.Fragment>
                {components}
            </React.Fragment>
        );
    }
}