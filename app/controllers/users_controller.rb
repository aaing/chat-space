class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def new
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path, notice: "編集内容を保存しました"
    else
      @full_messages = current_user.errors.full_messages
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
