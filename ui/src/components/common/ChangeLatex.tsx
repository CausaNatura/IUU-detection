import { defaultConfig } from 'constants/frontConfig';
import { MathComponent } from 'mathjax-react';
import reactStringReplace from 'react-string-replace';

interface IChangeLatex {
  text: string;
}

const ChangeLatex = ({ text }: IChangeLatex) => {
  return (
    <>
      {/* /LATEX_([^\s]+)/g
            /{search}/{flags}
            LATEX_ == literal search
            LATEX_(...) == capture following LATEX_ literal
            [^\s]+ == capture while \s (space) is found
            meaning: search all "LATEX_" capture following characters until space is found */}
      {reactStringReplace(
        text,
        new RegExp(`${defaultConfig.global.latex}([^\\s]+)`, 'g'),
        (match, i) => (
          <MathComponent key={i} tex={`${match}`} display={false} />
        )
      )}
    </>
  );
};

export default ChangeLatex;
