import { MenuProps, Button } from 'antd';
import 'styles/global.scss';

export const StudentItems: MenuProps['items'] = [
  {
    label: (
      <Button className="tg-secondary-btn tg-button" href="#" target="_blank">
        Preguntas Frecuentes
      </Button>
    ),
    key: 'faq',
  },
];
