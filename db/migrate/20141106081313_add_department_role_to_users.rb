class AddDepartmentRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :department_role, :string
  end
end
