enum Path {
  Account = '/account',
  Dashboard = '/dashboard',
  Home = '/',
  Organization = '/organizations/:organizationId',
  OrganizationMember = '/organizations/:organizationId/members/:memberId',
  OrganizationMembers = '/organizations/:organizationId/members',
  OrganizationProject = '/organizations/:organizationId/projects/:projectId',
  OrganizationProjects = '/organizations/:organizationId/projects',
  OrganizationProjectTask = '/organizations/:organizationId/projects/:projectId/task/:taskId',
  Organizations = '/organizations',
  Project = '/projects/:projectId',
  Projects = '/projects',
  Settings = '/settings',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Task = '/projects/:projectId/task/:taskId'
}

export default Path;
