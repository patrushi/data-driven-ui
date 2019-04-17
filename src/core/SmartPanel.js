import React, { PureComponent } from 'react';

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

    render() {
        let components = [];
        if (this.props.list) {
            let component = this.mixinProps(this.props.list, component => {return {
                key: 'list', 
                onSingleSelect: (selectKey) => {this.onSingleSelect(selectKey); component.props.onSingleSelect(selectKey);},
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
        if (this.props.detail) {
            let component = this.mixinProps(this.props.detail, component => {return {
                key: 'detail', 
                masterKey: this.state.masterCurrentKey
            }})
            components.push(component);
        }
        return (
            <React.Fragment>
                {components}
            </React.Fragment>
        );
    }
}