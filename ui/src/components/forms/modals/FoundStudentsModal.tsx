import { Descriptions } from 'antd';
import { ModalComponent } from 'components/common/ModalComponent';
import { BasicModalProps } from 'types/components';
import { Student } from 'types/student';

interface FoundStudentsModalProps extends BasicModalProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const descriptionSpan = 3;

export const FoundStudentsModal = ({
  open,
  onCancel,
  students,
  onSelectStudent,
}: FoundStudentsModalProps) => {
  // Found students by CURP modal

  const { ModalForm, ModalFooter } = ModalComponent();

  return (
    <ModalForm title="¿Eres este alumno?" open={open} onCancel={onCancel}>
      <>
        {students.map((student: Student, index: number) => (
          <div key={`student-${index}-data`}>
            <Descriptions layout="horizontal">
              <Descriptions.Item label="Nombre" span={descriptionSpan}>
                {student.name}
              </Descriptions.Item>
              <Descriptions.Item label="Escuela" span={descriptionSpan}>
                {student.school}
              </Descriptions.Item>
              <Descriptions.Item label="Subsistema" span={descriptionSpan}>
                {student.subsystem}
              </Descriptions.Item>
              <Descriptions.Item label="Turno" span={descriptionSpan}>
                {student.schedule}
              </Descriptions.Item>
              <Descriptions.Item label="Año" span={descriptionSpan}>
                {student.year}
              </Descriptions.Item>
              <Descriptions.Item label="Curp" span={descriptionSpan}>
                {student.curp}
              </Descriptions.Item>
            </Descriptions>

            <ModalFooter
              okText="Sí"
              cancelText="No"
              onCancel={onCancel}
              dataCyCancel=""
              keyOk=""
              dataCyOk=""
              onOk={() => {
                onSelectStudent(student);
              }}
            />
          </div>
        ))}
      </>
    </ModalForm>
  );
};
