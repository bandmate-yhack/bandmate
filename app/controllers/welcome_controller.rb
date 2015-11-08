class WelcomeController < ApplicationController
  def index
    redirect_to '/user/view' if current_user
    @bg_image = 'record.jpg'
  end
  def about
    @bg_image = 'accordian.jpg'
  end
end
