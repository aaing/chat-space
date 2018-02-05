class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    group = Group.new(group_params)
    if group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
  end

  private

  def group_params
    params.require(:group).permit(:user_ids, :name)
  end
  
end
