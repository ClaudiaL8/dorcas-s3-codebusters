import React from 'react';
import Form from './Form';
import Visor from './Visor';

class Main extends React.Component {
  render() {
    return (
      <main class="container">

        <Form 
          shareTitle4={this.props.shareTitle3} 
          titleDesignMain={this.props.titleDesignCardPage} 
          tituloMain={this.props.tituloCardPage} 
          skills ={this.props.skills} 
          changeForm={this.props.changeForm} 
          changeSkills={this.props.changeSkills} 
          addNewSelectedSkill={this.props.addNewSelectedSkill}
          removeSelectedSkill={this.props.removeSelectedSkill}
          request={this.props.request}
          urlCard={this.props.urlCard}
          form={this.props.form}
          handleImage={this.props.handleImage} 
          writeImages={this.props.writeImages} 
          imageUrl={this.props.imageUrl}
        />
        <Visor
          iconMain={this.props.iconCardPage}
          form={this.props.form}
          reset={this.props.reset}
        />
    
      </main>
    );
  }
}

export default Main;