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

    render() {
        let components = [];
        if (this.props.type === 'list-card') {
            if (this.props.list) {
                let component = this.mixinProps(this.props.list, component => {return {
                    key: 'list', 
                    onEdit: (item) => this.setState({masterCurrentItem: item, isEditCardOpen: true}),
                    setRef: (ref) => this.setState({masterRef: ref})
                }})
                components.push(component);
            }
            if (this.props.card) {
                let component = this.mixinProps(this.props.card, component => {return {
                    key: 'card', 
                    open: this.state.isEditCardOpen,
                    item: this.state.masterCurrentItem,
                    onClose: (change) => {
                        this.setState({isEditCardOpen: false});
                        if (change) this.state.masterRef.refresh(true);
                    }
                }});
                components.push(component);
            }
        } else if (this.props.type === 'master-detail') {
            if (this.props.master) {
                let component = this.mixinProps(this.props.master, component => {return {
                    key: 'master', 
                    onSingleSelect: (selectKey) => {this.onSingleSelect(selectKey); component.props.onSingleSelect(selectKey);},
                    setRef: (ref) => this.setState({masterRef: ref})
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
        return (
            <React.Fragment>
                {components}
            </React.Fragment>
        );
    }
}