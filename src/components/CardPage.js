import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class CardPage extends React.Component {
  render() {
    return (
    <div className="cardPage">
      <Header />
      <Main shareTitle3= {this.props.shareTitle2} titleDesignCardPage={this.props.titleDesign} iconCardPage={this.props.iconApp} skills ={this.props.skills} form={this.props.form} changeForm={this.props.changeForm} selectedSkills={this.props.selectedSkills} 
      addNewSelectedSkill={this.props.addNewSelectedSkill}
      removeSelectedSkill={this.props.removeSelectedSkill}


/>
      <Footer />
    </div>
    );
  }
}

export default CardPage;