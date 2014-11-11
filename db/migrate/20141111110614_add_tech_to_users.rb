class AddTechToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tech, :boolean, default: false
  end
end
