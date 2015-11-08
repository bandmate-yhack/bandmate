class UserController < ApplicationController
  before_filter :authorize
  def view
    uid = session[:user_id]
    if params.has_key? :user_id
      uid = params[:user_id]
    end
    @user = User.find(uid)
  end
end
