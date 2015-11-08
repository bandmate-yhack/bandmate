class AddOwnerToProjects < ActiveRecord::Migration
  def change
    add_reference :projects, :owner, references: :users
  end
end
