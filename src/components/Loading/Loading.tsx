type Props = { width?: number; height?: number };

export const Loading = ({ width = 15, height = 15 }: Props) => {
  return <span className="loader" style={{ width: width, height: height }} />;
};
