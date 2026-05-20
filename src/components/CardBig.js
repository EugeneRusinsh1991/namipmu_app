// Для обратной совместимости - используйте Card напрямую вместо CardBig
import Card from './Card';

export default function CardBig(props) {
  return <Card {...props} size="big" />;
}
