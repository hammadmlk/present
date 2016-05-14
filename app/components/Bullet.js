var React = require('react');
var PropTypes = React.PropTypes;

var Link = require('./Link');

require('../scss/Bullet.scss');

function Bullet(props) {

    var linkList = props.linkList.map(function(link) {
        return <Link
                     key={ link.id }
                     id={ link.id }
                     text={ link.text }
                     url={ link.url } />;
    });

    return (
        <div className="bullet">
          <div className='developer-name'>
            { props.developer }
          </div>
          <div className="bullet-text">
            { props.text }
          </div>
          <span className="link-list">{ linkList }</span>
        </div>
    )
}

Bullet.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    developer: PropTypes.string.isRequired,
    linkList: PropTypes.array.isRequired // validate each object in array is a Link
}

module.exports = Bullet;
