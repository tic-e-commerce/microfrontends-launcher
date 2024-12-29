interface DynamicTitleProps {
  title: string;
}

const DynamicTitle = ({ title }: DynamicTitleProps) => {
  return <h3 className="text-danger fw-bold text-center mb-4">{title}</h3>;
};

export default DynamicTitle;
