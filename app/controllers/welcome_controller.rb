class WelcomeController < ApplicationController
  def index
    @bg_image = 'record.jpg'
  end
  def about
    @bg_image = 'accordian.jpg'
  end
end
