export const oneChabotMessage = (
  role: string | undefined,
  content?: string
) => {
  const date = new Date();
  const message = {
    role: role,
    content: content,
    createdAt: date,
    updatedAt: date,
  };
  return message;
};
