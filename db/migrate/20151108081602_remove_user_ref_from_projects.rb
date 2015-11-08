class RemoveUserRefFromProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :user_id, :reference
  end
end
