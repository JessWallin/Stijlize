import React from 'react';

const About = props => {
  return (
    <div className="about">
      <img
        className="popImage"
        src="https://ids.lib.harvard.edu/ids/view/43183738"
      />
      <p className="caption">
        Composition with Blue, Black, Yellow, and Red, Piet Mondrian
      </p>
      <p>
        Stijlize combines art and data to translate works of art into data
        visualization reminiscent of De Stijl style artwork. The De Stijl
        movement was based on the idea of art as a universal visual langage,
        much in the same way that data visualization can provide an abstracted
        visual context to quantifiable data.
        <br />
        Stijlize is also a tool for bringing fine-arts driven color pallettes
        into your design.{' '}
      </p>
      <button type="button" onClick={props.close}>
        Close
      </button>
    </div>
  );
};

export default About;
