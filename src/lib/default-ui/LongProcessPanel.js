import React, { PureComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LongProcessPanel extends PureComponent {

    render() {
        return (
            <React.Fragment>
                {this.props.isLoading ? <div style={{position: 'absolute', width: '100%', paddingTop: '50px', textAlign: 'center'}}>
                    <CircularProgress />
                </div> : (null)}
                <div style={this.props.isLoading ? {opacity: .3, pointerEvents: 'none'} : {}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}