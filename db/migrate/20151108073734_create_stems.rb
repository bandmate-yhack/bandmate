class CreateStems < ActiveRecord::Migration
  def change
    create_table :stems do |t|
      t.string :instrument

      t.timestamps null: false
    end
  end
end
