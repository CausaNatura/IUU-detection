import { useLocation } from 'react-router-dom';
import { Table, Row, Col, Button } from 'antd';
import { errorColumns } from 'constants/uploadErrorsColums';
import { WarningOutlined } from '@ant-design/icons';
import { PageTitle } from 'components/common/PageTitle';
import { useNavigate } from 'react-router-dom';

const UploadErrorsPage = () => {
  const location = useLocation();
  const uploadErrors = location.state?.object;
  const navigate = useNavigate();

  return (
    <div id="upload-errors-page">
      <Row>
        <Col xs={{ span: 22, offset: 1 }}>
          <PageTitle>Resumen de errores</PageTitle>
          <h2 className="g-h1 tg-title">Resumen de errores</h2>
          <Button
            type="primary"
            className="tg-button tg-secondary-btn mb-4"
            onClick={() => {
              navigate(-1);
            }}
          >
            Regresar
          </Button>
          {uploadErrors ? (
            <>
              <h2 className="g-h3 tg-error">
                <WarningOutlined /> {uploadErrors.fileName}
              </h2>
              <p className="info-txt my-7">
                No se pudo subir el archivo porque se encontraron los siguientes
                errores:
              </p>
              <Table
                className="g-table table-info"
                columns={errorColumns}
                dataSource={uploadErrors.newBadRegisters}
                pagination={false}
              />
            </>
          ) : (
            <h2 className="g-h1 tg-title"> No hay errores para mostrar </h2>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UploadErrorsPage;
