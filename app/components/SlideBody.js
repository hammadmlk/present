var React = require('react');
var PropTypes = React.PropTypes;

var Bullet = require('./Bullet');

require('../scss/SlideBody.scss');

function SlideBody (props) {

  var bulletList = props.bulletList.map(function(bullet){
    return <Bullet key={bullet.id} 
                   id={bullet.id} 
                   text={bullet.text} 
                   developer={bullet.developer} 
                   linkList={bullet.linkList}/>;
  });

  return (
	<div className="slide-body">
	  <div className="bullet-list"> 
	    {bulletList}
	  </div>
	</div>
  )
}

SlideBody.propTypes = {
  bulletList: PropTypes.array.isRequired // validate each object in array is a bullet
}

module.exports = SlideBody;
