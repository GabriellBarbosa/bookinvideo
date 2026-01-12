interface Props {
  slug: string;
}

export default function CourseTemplate(props: Props) {
  return <div>Olá mundo de novo: {props.slug}</div>;
}
