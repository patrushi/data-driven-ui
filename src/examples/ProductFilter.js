import React, { PureComponent } from 'react';
import LongSelect from '../default-ui/LongSelect';
import MenuItem from '@material-ui/core/MenuItem';

export default class ProductFilter extends PureComponent {
    render() {
        const Option = (props) => {
            return (
                <MenuItem
                    buttonRef={props.innerRef}
                    selected={props.isFocused}
                    component="div"
                    style={{
                        fontWeight: props.isSelected ? 500 : 400,
                        maxHeight: '100px',
                        height: 'auto'
                    }}
                    {...props.innerProps}
                >
                    <div>
                        {props.children}
                        <div style={{fontSize: 10}}>
                            QuantityPerUnit: {props.data.extraData.QuantityPerUnit},<br/>
                            QuantityPerUnit: {props.data.extraData.QuantityPerUnit},
                        </div>
                    </div>                
                </MenuItem>
            );
        }
        return <LongSelect {...this.props} placeholder={"Product"} components={{ Option }} />
    }
}