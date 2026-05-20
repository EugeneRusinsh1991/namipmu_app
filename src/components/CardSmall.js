// Для обратной совместимости - используйте Card напрямую вместо CardSmall
import Card from './Card';

export default function CardSmall(props) {
  return <Card {...props} size="small" />;
}
