// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.6;
contract SimpleTokenFactoryAttack {
    address private _template;
    constructor() {
        _template = address(this);
    }

    function getImplementation() public view returns (address) {
        return _template;
    }
}    