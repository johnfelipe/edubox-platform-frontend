'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:UnitCtrl
 * @description Dealing with launching an individual learning unit
 * # UnitCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('UnitCtrl', ['$scope', '$routeParams', 'Units',
      function ($scope, $routeParams, Units) {
        $scope.appLaunchUrl = Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit);
        $scope.$on('$viewContentLoaded', function(){
          angular.element(document.getElementById("app-frame"))
            .on('load', function(){
              console.log("Updating app frame links");
              var routing = {
                'code.org': true,
                'scratch.mit.edu': true,
                'google.com': true,
                'google-analytics': true
              };
              var routed_url = new URI(this.contentDocument.location.href);
              var router_domain = routed_url.domain();
              var token = routed_url.search(true).token;
              var update_url_ = function(url, ignore_token){
                if( url[0] == '/'){
                  if(!ignore_token && token){
                    return new URI(url).addQuery("token", token).toString();
                  }
                }else{
                  // convert url into a more manageable form.
                  var url_obj = new URI(url);
                  var host = url_obj.host()
                  // if host should be routed
                  if( routing[host] || routing[url_obj.domain()] ){
                    // Construct the routed host to send the request to.
                    var routed_host = "";
                    for (var i=0; i < host.length; i++) {
                      routed_host += host.charCodeAt(i).toString(16);
                    }
                    routed_host += "."+router_domain;
                    url_obj = url_obj.host(routed_host);

                    // Add the token if applicable.
                    if(!ignore_token && token){
                      url_obj = url_obj.addQuery("token", token)
                    }
                    return url_obj.toString();
                  }
                }
                // If no adaption rule applied, return the original url
                return url;
              }
              // Update any jQuery ajax call, if applicable.
              if('jQuery' in this.contentWindow){
                this.contentWindow.jQuery.ajaxPrefilter(function(options){
                  options.url = update_url(options.url);
                });
              }
              // Update links in <a> tags
              var a_tags = this.contentDocument.getElementsByTagName("a");
              for(var i=0; i < a_tags.length; i++){
                a_tags[i].href = update_url(a_tags[i].href);
              });
              // Update actions in <form> tags
              var form_tags = this.contentDocument.getElementsByTagName("form");
              for(var i=0; i < form_tags.length; i++){
                form_tags[i].action = update_url(a_tags[i].action);
              });
            });
        }
      }
  ]);
