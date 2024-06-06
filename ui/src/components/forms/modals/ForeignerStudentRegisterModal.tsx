import { Form, Input, Modal, Select } from 'antd';
import { ApiErrorData } from 'api/http.api';
import { registerForeignerStudent } from 'api/student.api';
import { ModalComponent } from 'components/common/ModalComponent';
import { ShowErrorMessage } from 'hooks/GetErrorMessage';
import { useState } from 'react';
import { ApiError } from 'types';
import { BasicModalProps } from 'types/components';
import { School } from 'types/school';
import {
  NewForeignerStudent,
  NewForeignerStudentForm,
  NewForeignerStudentResponse,
  Student,
} from 'types/student';

interface NewForeignerStudentModalProps extends BasicModalProps {
  onFinishRegister: (student: Student) => void;
  subsystems: string[];
  schools: School[];
}

export const ForeignerStudentRegisterModal = ({
  open,
  onCancel,
  onFinishRegister,
  subsystems,
  schools,
}: NewForeignerStudentModalProps) => {
  const { ModalFooter } = ModalComponent();

  const onRegisterForeignerStudent = async (
    values: NewForeignerStudentForm
  ) => {
    try {
      const payload: NewForeignerStudent = {
        name: `${values.name} ${values.firstLastName} ${values.secondLastName ?? ''}`,
        year: values.year,
        schedule: values.schedule,
        subsystem: values.subsystem,
      };
      const newForeignerStudentResponse: NewForeignerStudentResponse =
        await registerForeignerStudent(payload);
      onFinishRegister(newForeignerStudentResponse.student);
    } catch (error) {
      const err = error as ApiError<ApiErrorData>;
      ShowErrorMessage({
        status: err.statusCode,
      });
    }
  };

  const [selectedSubsystem, setSelectedSubsystem] = useState('');
  const handlerSubsystem = (value: string) => {
    setSelectedSubsystem(value);
  };

  return (
    <Modal
      title="Ingresa tu información"
      open={open}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        layout="vertical"
        onFinish={onRegisterForeignerStudent}
        className="tg-main-layout-form tg-form-bg-light"
        requiredMark={false}
      >
        <Form.Item
          label="Nombre(s)"
          hasFeedback
          name="name"
          rules={[
            {
              required: true,
              message: 'Ingresa tu nombre',
            },
          ]}
        >
          <Input type="text" data-cy="login-name-input" />
        </Form.Item>
        <Form.Item
          label="Primer Apellido"
          hasFeedback
          name="firstLastName"
          rules={[
            {
              required: true,
              message: 'Ingresa tu primer apellido',
            },
          ]}
        >
          <Input type="text" data-cy="login-first-last-name-input" />
        </Form.Item>
        <Form.Item
          label="Segundo Apellido (opcional)"
          hasFeedback
          name="secondLastName"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input type="text" data-cy="login-second-last-name-input" />
        </Form.Item>
        <Form.Item
          label="Año escolar"
          hasFeedback
          name="year"
          rules={[
            {
              required: true,
              message: 'Selecciona tu año escolar',
            },
          ]}
        >
          <Select>
            <Select.Option value="1">Primer año</Select.Option>
            <Select.Option value="2">Segundo año</Select.Option>
            <Select.Option value="3">Tercer año</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Turno"
          hasFeedback
          name="schedule"
          rules={[
            {
              required: true,
              message: 'Selecciona tu turno',
            },
          ]}
        >
          <Select>
            <Select.Option value="MATUTINO">Matutino</Select.Option>
            <Select.Option value="VESPERTINO">Vespertino</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Subsistema"
          hasFeedback
          name="subsystem"
          rules={[
            {
              required: true,
              message: 'Selecciona tu subsistema',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={subsystems.map((s) => {
              return { value: s, label: s };
            })}
            onChange={handlerSubsystem}
          />
        </Form.Item>

        <Form.Item
          label="Plantel"
          hasFeedback
          name="school"
          rules={[
            {
              required: true,
              message: 'Selecciona tu plantel',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={schools
              .filter((s) => selectedSubsystem === s.subsystem)
              .map((s) => {
                return { value: s.cct, label: s.name };
              })}
          />
        </Form.Item>
        <ModalFooter
          cancelText="Cancelar"
          okText="Registrarme"
          onCancel={onCancel}
          onOk={onCancel}
          dataCyCancel="cancel-btn"
          keyOk="edit"
          dataCyOk="save-btn"
        />
      </Form>
    </Modal>
  );
};
