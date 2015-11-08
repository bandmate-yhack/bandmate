class Track < ActiveRecord::Base
  belongs_to :project
  has_many :stems
end
