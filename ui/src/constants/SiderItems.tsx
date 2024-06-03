/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom';
import { MenuItem, SiderItemsRelationType } from 'types/global';
import {
  QuestionCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  CloseCircleOutlined,
  LogoutOutlined,
  FlagOutlined,
  IdcardOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  PercentageOutlined,
  LineChartOutlined,
  QuestionOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { paths } from './paths';

export const FixedSiderItems: MenuProps['items'] = [
  {
    type: 'divider',
    key: 'first-divider',
  },
  {
    label: <Link to={'#'}>Guía de uso de plataforma</Link>,
    key: 'guide',
    icon: <QuestionCircleOutlined />,
  },
  {
    type: 'divider',
    key: 'second-divider',
  },
  {
    label: (
      <Link className="close-item" to={'#'}>
        Cerrar edición
      </Link>
    ),
    key: 'close-edition',
    icon: <CloseCircleOutlined />,
  },
  {
    label: (
      <Link
        className="close-item"
        to={`/${paths.auth.index}/${paths.auth.logout}`}
      >
        Cerrar sesión
      </Link>
    ),
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];

const QuestionnairesItem: MenuItem = {
  label: <Link to={'#'}>Cuestionarios</Link>,
  key: 'questionnaires',
  icon: <FileTextOutlined />,
};

const UsersItem: MenuItem = {
  label: <Link to={`${paths.admin.users}`}>Usuarios</Link>,
  key: 'users',
  icon: <UserOutlined />,
};

const SchoolsItem: MenuItem = {
  label: <Link to={`${paths.schools.index}`}>Planteles</Link>,
  key: 'schools',
  icon: <FlagOutlined />,
};

const StudentsItem: MenuItem = {
  label: <Link to={`${paths.students.index}`}>Alumnos</Link>,
  key: 'students',
  icon: <IdcardOutlined />,
};

const ReportsItem: MenuItem = {
  label: <Link to={paths.reports.index}>Reportes</Link>,
  key: 'reports',
  icon: <BarChartOutlined />,
};

const NumeralsItem: MenuItem = {
  label: <Link to={paths.numerals.index}>Numeralia</Link>,
  key: 'numerals',
  icon: <PercentageOutlined />,
};

const AnswersItem: MenuItem = {
  label: <Link to={paths.answers.index}>Respuestas</Link>,
  key: 'answers',
  icon: <FileSearchOutlined />,
};

const AdvanceItem: MenuItem = {
  label: <Link to={'#'}>Avance</Link>,
  key: 'advance',
  icon: <LineChartOutlined />,
};

const FrequentQuestionsItem: MenuItem = {
  label: <Link to={paths.questions.index}>Preguntas frecuentes</Link>,
  key: 'frequentQuestions',
  icon: <QuestionOutlined />,
};

const DownloadHistoryItem: MenuItem = {
  label: <Link to={'#'}>Historial de descargas</Link>,
  key: 'downloadHistory',
  icon: <CloudDownloadOutlined />,
};

export const SiderItemsRelation: SiderItemsRelationType = {
  // Key of this object comes from FE_SIDER_ITEMS env var
  cuestionarios: QuestionnairesItem,
  usuarios: UsersItem,
  planteles: SchoolsItem,
  alumnos: StudentsItem,
  reportes: ReportsItem,
  numeralia: NumeralsItem,
  respuestas: AnswersItem,
  avance: AdvanceItem,
  preguntasFrecuentes: FrequentQuestionsItem,
  historialDescargas: DownloadHistoryItem,
};
