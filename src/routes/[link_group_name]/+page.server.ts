export const load = ({ params }) => {
  const linkGroupName = params.link_group_name;

  return {
    link_group_name: params.link_group_name,
  };
};
