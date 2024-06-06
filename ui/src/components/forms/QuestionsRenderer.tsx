import { Question } from 'types/register';
import { School } from 'types/school';
import { Form, Input, Select } from 'antd';

interface RenderData {
  questions: Question[];
  handleSearch?: (value: string) => void;
  handleSelectChange?: (fieldName: string, value: string) => void;
  schools?: School[];
  handleInputChange?: (fieldName: string, value: string) => void;
}

const QuestionsRenderer = ({
  questions,
  handleSearch,
  schools,
}: RenderData) => {
  return (
    <div id="questions-renderer">
      {questions.map((question) => (
        <Form.Item
          label={question.question}
          name={question.name}
          rules={[
            ...(question.validation_rules ? question.validation_rules : []),
            { required: question.required, message: 'Campo obligatorio' },
          ]}
        >
          {question.type === 'input' && <Input data-cy={question.name} />}
          {question.type === 'select' && (
            <Select
              data-cy={question.name}
              disabled={question.disable}
              showSearch
              onSearch={handleSearch}
              options={
                question.name === 'cct' && schools
                  ? schools.map((option) => {
                      return {
                        value: option.cct,
                        label: option.cct + ' ' + option.name,
                      };
                    })
                  : question.option?.map((option) => {
                      return {
                        value: option.value,
                        label: option.label,
                      };
                    })
              }
            />
          )}
        </Form.Item>
      ))}
    </div>
  );
};

export default QuestionsRenderer;
