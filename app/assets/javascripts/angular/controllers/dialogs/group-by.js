//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

angular.module('openproject.workPackages.controllers')

.factory('groupingModal', ['btfModal', function(btfModal) {
  return btfModal({
    controller:   'GroupByModalController',
    controllerAs: 'modal',
    templateUrl:  '/templates/work_packages/modals/group_by.html'
  });
}])

.controller('GroupByModalController', [
  '$scope',
  'groupingModal',
  'QueryService',
  'WorkPackagesTableService',
  function($scope, groupingModal, QueryService, WorkPackagesTableService) {

  this.name    = 'GroupBy';
  this.closeMe = groupingModal.deactivate;

  $scope.getGroupableColumnsData = function(term, result) {
    result($scope.groupableColumnsData);
  };

  $scope.updateGroupBy = function(){
    QueryService.setGroupBy($scope.selectedGroupByData.id);

    groupingModal.deactivate();
  };

  $scope.workPackageTableData = WorkPackagesTableService.getWorkPackagesTableData();

  $scope.$watch('workPackageTableData.groupableColumns', function(groupableColumns){
    if (!groupableColumns) return;

    $scope.groupableColumns = groupableColumns;
    $scope.groupableColumnsData = groupableColumns.map(function(column){
      return { id: column.name, label: column.title, other: column.title };
    });

    var currentGroupBy = $scope.groupableColumnsData.filter(function(column){
      return column.id == QueryService.getGroupBy();
    });

    if(currentGroupBy.length){
      $scope.selectedGroupByData = currentGroupBy[0];
    }
  });

}]);