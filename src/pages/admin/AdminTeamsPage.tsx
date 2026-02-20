import { AdminTeamsTable } from '../../admin/AdminTeamsTable'

export function AdminTeamsPage() {
  return (
    <div>
      <h1>Teams</h1>
      <p className="page-intro">
        Maintain team member profiles displayed on the public partnership website.
      </p>
      <AdminTeamsTable />
    </div>
  )
}

