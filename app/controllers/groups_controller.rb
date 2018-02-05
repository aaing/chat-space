class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
  end

  private

  def group_params
  end
  
end
