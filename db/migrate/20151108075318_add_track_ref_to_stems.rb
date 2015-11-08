class AddTrackRefToStems < ActiveRecord::Migration
  def change
    add_reference :stems, :track, index: true, foreign_key: true
  end
end
