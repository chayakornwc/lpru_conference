
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        return (
            <div>
                            <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                <p>
                    <strong>Design</strong> by <a href="https://jgthms.com">CHAYAKORN KAEWWONG</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
                </div>
            </div>
            </footer>
            </div>
        );
    }
}

Footer.propTypes = {

};

export default Footer;